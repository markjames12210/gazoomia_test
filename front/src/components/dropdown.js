import React, { Component } from 'react';
import './dropdown.css';
import { AiOutlineUnorderedList, AiOutlineDown, AiOutlineRight } from 'react-icons/ai';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { groupBy, pickBy, isEmpty } from "lodash";

const token_keys = [
	"background",
	"clothes",
	"earring",
	"eyes",
	"fur",
	"hat",
	"mouth",
];

const tokensQuery = `
query {
	tokens(
		where: {
			collection: "Bored Ape Yacht Club"
		},
		first: 10
	) {
		id
		tokenID
		contentURI
		collection
		eyes
		background
		hat
		mouth
		clothes
		fur
		earring
	}
}
`
const APIURL = 'https://api.thegraph.com/subgraphs/name/markjames12210/boredape';
const client = new ApolloClient({
	uri: APIURL,
	cache: new InMemoryCache(),
})

class DropDown extends Component {

	state = {
		result: {},
		isOpen: {}
	}

	async componentDidMount () {
		const {data, loading} = await this.getData();
		if (!loading) {
			this.analysisData(data);
		}
	}
	
	analysisData = (data) => {
		if (isEmpty(data)) return;
		const tokens = data.tokens;
		let {isOpen} = this.state;
		let result = {};
		tokens.map(item=>{
			Object.keys(item).map(index=>{
				if(!isEmpty(item[index]) && item[index].includes("M1 ")) item[index].replace("M1 ", "");
				if(!isEmpty(item[index]) && item[index].includes("M2 ")) item[index].replace("M2 ", "");
				return item[index];
			})
			return item;
		});
		token_keys.map(item=>{
			let group_item = groupBy(tokens, item);
			isOpen[item] = false;
			result[item] = pickBy(group_item, (_value, key)=>{
				return key !== "null";
			});
			return item;
		});
		this.setState({isOpen, result});
	}	

	getData = async () => {
		return new Promise((resolve, reject) => {
			client
			.query({
				query: gql(tokensQuery),
			})
			.then(resolve)
			.catch(reject);
		});
	}

	setIsOpenState = (index) => {
		let {isOpen} = this.state;
		isOpen[index] = !isOpen[index];
		this.setState({isOpen});
	}

	render () {
		const {result, isOpen} = this.state;
		return (
			<div className='dropdown-box'>
				{Object.keys(result).map((index)=>{
					let item = result[index];
					return (
						<div key={index}>
							<div className='type' onClick={()=>this.setIsOpenState(index)}>
								<div className='left-part'>
									<AiOutlineUnorderedList />
									<div style={{marginLeft:8}}>{index}</div>
								</div>
								<div className='right-part'>
									<div style={{marginRight:8}}>{Object.keys(item).length}</div>
									{isOpen[index] ? <AiOutlineDown /> : <AiOutlineRight />}
								</div>
							</div>
							{isOpen[index] && (
								<div className='list'>
									{Object.keys(item).map(sub_index=>{
										let sub_item = item[sub_index];
										return (
											<div className='list-item' key={sub_index}>
												<div>{sub_index.replace("M1 ", "")}</div>
												<div>{Object.keys(sub_item).length}</div>
											</div>
										)
									})}
								</div>
							)}
						</div>
					)
				})}
			</div>
		)
	}
}

export default DropDown;