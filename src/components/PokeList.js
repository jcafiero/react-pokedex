import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';

class PokeList extends Component {
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
	async getPokemon() {
		try {
			let response = undefined;
			let page = Number(this.state.page);

			response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}`);
			this.setState({ 
				count: response.data.count,
				data: response.data.results,
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
			this.getPokemon(); //Number(this.props.match.params.page)
		});
	}

	prevPage() {
		let y = Number(this.state.page);
		if (y > 0) {
			this.setState({ page: y - 1 }, () => {
				this.getPokemon();
				this.props.history.push(`/pokemon/page/${this.state.page}`);
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
		// if (Math.floor(this.state.count/20) - this.state.page > 0) {
			this.setState({ page: y + 1 }, () => {
				this.getPokemon();
				this.props.history.push(`/pokemon/page/${this.state.page}`);
			});
			
		}
		// }
	}

	render() {
		let body = null;
		let li = null;

		li =
			this.state.data &&
			this.state.data.map(pokemon => (
				<li key={pokemon.name}>
					<Link to={`/pokemon/${pokemon.url.slice(34, -1)}`}>{pokemon.name}</Link>
				</li>
			));

		// if (this.state.hasError) {
		if (Number(this.state.page) - 1 >= Math.floor(this.state.count/20) || this.state.hasError) {
			return <Redirect to='/404' />
		}
		
		let pagination = null;

		if (Number(this.state.page) === 0) {
			pagination = <Pagination>
				<Pagination.Next onClick={this.nextPage}>Next</Pagination.Next>
			</Pagination>
		// } else if (Number(this.state.page) === Math.floor(this.state.count/20)) {
		// 	pagination = <Pagination>
		// 		<Pagination.Prev onClick={this.prevPage}>Prev</Pagination.Prev>
		// 	</Pagination>
		} else {
			pagination = <Pagination>
				<Pagination.Prev onClick={this.prevPage}>Prev</Pagination.Prev>
				<Pagination.Next onClick={this.nextPage}>Next</Pagination.Next>
			</Pagination>
		};
		body = (
			<div>
				<h2>Pokemon List</h2>
				<ul className="list-unstyled">{li}</ul>
				<div className="pagination">{pagination}</div>
			</div>
		);
		return body;
	}
}

export default PokeList;
