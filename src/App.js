import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import './App.css';

const PokemonRow = ({ pokemon, onSelect }) => {
	return (
		<tr>
			<td>{pokemon.name.english}</td>
			<td>{pokemon.type.join(', ')}</td>
			<td>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => onSelect(pokemon)}
				>
					Select
				</Button>
			</td>
		</tr>
	);
};

PokemonRow.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.shape({
			english: PropTypes.string,
		}),
		type: PropTypes.arrayOf(PropTypes.string),
	}),
	onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, base }) => (
	<div>
		<h1>{name.english}</h1>
		<table>
			{Object.keys(base).map((key) => (
				<tr key={key}>
					<td>{key}</td>
					<td>{base[key]}</td>
				</tr>
			))}
		</table>
	</div>
);

PokemonInfo.propTypes = {
	name: PropTypes.shape({
		english: PropTypes.string,
	}),
	base: PropTypes.shape({
		HP: PropTypes.number.isRequired,
		Attack: PropTypes.number.isRequired,
		Defense: PropTypes.number.isRequired,
		'Sp. Attack': PropTypes.number.isRequired,
		'Sp. Defense': PropTypes.number.isRequired,
		Speed: PropTypes.number.isRequired,
	}),
};

const Title = styled.h1`
	text-align: center;
`;

const TwoColumnLayout = styled.div`
	display: grid;
	grid-template-columns: 70% 30%;
	grid-column-gap: 1rem;
`;

const Container = styled.div`
	margin: auto;
	width: 800px;
	padding-top: 1rem;
`;

const Input = styled.input`
	width: 100%;
	font-size: x-large;
	padding: 0.2rem;
`;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
			pokemon: [],
			selectedItem: null,
		};
	}
	componentDidMount() {
		fetch('http://localhost:3000/starting-react/pokemon.json')
			.then((res) => res.json())
			.then((pokemon) => this.setState({ ...this.state, pokemon }));
	}

	render() {
		return (
			<Container>
				<Title className="title">Pokemon Search</Title>

				<TwoColumnLayout>
					<div>
						<Input
							value={this.state.filter}
							onChange={(e) => {
								this.setState({ ...this.state, filter: e.target.value });
							}}
							type="text"
						/>
						<table width="100%">
							<thead>
								<tr>
									<th>Pokemon</th>
									<th>Type</th>
								</tr>
							</thead>
							<tbody>
								{this.state.pokemon
									.filter((pokemon) =>
										pokemon.name.english
											.toLowerCase()
											.includes(this.state.filter.toLowerCase())
									)
									//.slice(0, 20)
									.map((pokemon) => (
										<PokemonRow
											key={pokemon.id}
											pokemon={pokemon}
											onSelect={(pokemon) =>
												this.setState({ ...this.state, selectedItem: pokemon })
											}
										/>
									))}
							</tbody>
						</table>
					</div>
					{this.state.selectedItem && (
						<PokemonInfo {...this.state.selectedItem} />
					)}
				</TwoColumnLayout>
			</Container>
		);
	}
}

/*React.useEffect(() => {
		fetch('http://localhost:3000/starting-react/pokemon.json')
			.then((res) => res.json())
			.then((data) => pokemonSet(data));
	}, []);
*/

export default App;
