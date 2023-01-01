import { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import './App.css';
import pokemon from './pokemon.json';

const PokemonRow = ({ pokemon, onSelect }) => {
	return (
		<tr>
			<td>{pokemon.name.english}</td>
			<td>{pokemon.type.join(', ')}</td>
			<td>
				<button onClick={() => onSelect(pokemon)}>Select</button>
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

function App() {
	const [filter, filterSet] = useState('');
	const [selectedItem, setSelectedItem] = useState(null);
	return (
		<div style={{ margin: 'auto', width: 800, paddingTop: '1rem' }}>
			<h1 className="title">Pokemon Search</h1>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '70% 30%',
					gridColumnGap: '1rem',
				}}
			>
				<div>
					<input
						value={filter}
						onChange={(e) => {
							filterSet(e.target.value);
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
							{pokemon
								.filter((pokemon) =>
									pokemon.name.english
										.toLowerCase()
										.includes(filter.toLowerCase())
								)
								//.slice(0, 20)
								.map((pokemon) => (
									<PokemonRow
										key={pokemon.id}
										pokemon={pokemon}
										onSelect={(pokemon) => setSelectedItem(pokemon)}
									/>
								))}
						</tbody>
					</table>
				</div>
				{selectedItem && <PokemonInfo {...selectedItem} />}
			</div>
		</div>
	);
}

export default App;
