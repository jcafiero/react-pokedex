import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

class BerryList extends Component {
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
	
	async getBerries() {
		try {
			let page = Number(this.state.page);
			const response = await axios.get(`https://pokeapi.co/api/v2/berry?offset=${page * 20}`);
			this.setState({
				data: response.data.results,
				count: response.data.results,
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
			this.getBerries();
		});
	}

	prevPage() {
		let y = Number(this.state.page);
		if (y > 0) {
			this.setState({ page: y - 1 }, () => {
				this.getBerries();
				this.props.history.push(`/berries/page/${this.state.page}`);
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
				this.getBerries();
				this.props.history.push(`/berries/page/${this.state.page}`);
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
		if (Number(this.state.page) === 0) { 
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
			this.state.data.map(berry => (
				<li key={berry.name}>
					<Link to={`/berries/${berry.url.slice(32, -1)}`}>{berry.name}</Link>
				</li>
			));

		body = (
			<div>
				<h2>Berry List</h2>
				<ul className="list-unstyled">{li}</ul>
				<div className="pagination">{pagination}</div>
			</div>
		);
		return body;
	}
}

export default BerryList;
