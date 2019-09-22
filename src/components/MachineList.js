import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

class MachineList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: undefined,
			loading: false,
			page: 0,
			count: undefined,
			max_page: 0,
			hasError: false
		};
		this.prevPage = this.prevPage.bind(this, this.state.page);
		this.nextPage = this.nextPage.bind(this, this.state.page);
	}

	async getMachines() {
		try {
			let page = Number(this.state.page);
			const response = await axios.get(`https://pokeapi.co/api/v2/machine?offset=${page * 20}`);
			this.setState({
				data: response.data.results,
				count: response.data.count,
				max_page: Math.floor(this.state.count/20)
			});
		} catch (e) {
			this.setState({
				hasError: true
			});
			console.log(e);
		}
	}

	componentDidMount() {
		const { page } = this.props.match.params;
		this.setState({page: page}, () => {
			this.getMachines();
		});
	}

	prevPage() {
		let y = Number(this.state.page);
		if (y > 0) {
			this.setState({ page: y - 1 }, () => {
				this.getMachines();
				this.props.history.push(`/machines/page/${this.state.page}`);
			});
		}
	}

	nextPage() {
		let y = Number(this.state.page);
		if (Math.floor(this.state.count/20) - this.state.page === 0) {
			this.setState({
				hasError: true
			});
		} else {
				this.setState({ page: y + 1 }, () => {
				this.getMachines();
				this.props.history.push(`/machines/page/${this.state.page}`);
			});
		}
	}

	render() {
		let body = null;
		let li = null;

		if (Number(this.state.page) - 1 >= Math.floor(this.state.count/20) || this.state.hasError) {
			return <Redirect to='/404' />
		}

		let pagination = null;
		if (this.state.page === 0) { 
			pagination = <Pagination>
				<Pagination.Next onClick={this.nextPage}>Next</Pagination.Next>
			</Pagination>
		} else {
			pagination = <Pagination>
					<Pagination.Prev onClick={this.prevPage}>Prev</Pagination.Prev>
					<Pagination.Next onClick={this.nextPage}>Next</Pagination.Next>
				</Pagination>
		};
		li =
			this.state.data &&
			this.state.data.map(machine => (
				<li key={machine.url}>
					<Link to={`/machines/${machine.url.slice(34, -1)}`}>Machine #{machine.url.slice(34, -1)}</Link>
				</li>
			));

		body = (
			<div>
				<h2>Machine List</h2>
				<ul className="list-unstyled">{li}</ul>
				<div className="pagination">{pagination}</div>
			</div>
		);
		return body;
	}
}

export default MachineList;
