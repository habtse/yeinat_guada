import { NavBar } from "../nav/navBar";
import { useState, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline'
import { MotherBetProvider } from "../../api/MotherbetProvider";
import { Rating } from "../rating/rating";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    return (
        <div className="flex flex-row gap-4 m-4  md:w-1/2" >
            <input type="search" name='searchText' value={props.searchText} onChange={(event) => { props.setSearchText(event.value) }} className='flex-grow border rounded p-1' />
            <button className="flex flex-row gap-2 content-center items-center p-2 rounded bg-orange-500 text-white">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                Search</button>
        </div>
    )
}

const SearchResults = (props) => {
    return (
        <div className="flex flex-row flex-wrap gap-4 mx-4 items-stretch">
            {props.motherBets.map(data => <MotherBetCard data={data} key={data.id} />)}
        </div>
    )
}

const MotherBetCard = (props) => {
    const navigate = useNavigate()
    return (
        <article className="flex flex-row gap-4 rounded border shadow w-96" onClick={() => navigate(`/mother-bet/${props.data.id}`)}>
            <img src={props.data.imageUrl} className="aspect-square rounded-tl rounded-bl w-2/6" alt={`profile of ${props.data.name}`} />
            <div className="flex flex-col  justify-around">
                <h1 className="text-xl sm:text-2xl">{props.data.name}</h1>
                <Rating rating={props.data.rating} isInteractive={false} />
            </div>
        </article>
    )
}

export const CustomerHome = ({ cart, setCart }) => {
    const [searchText, setSearchText] = useState("")
    const [motherBets, setMotherBets] = useState([])

    useEffect(() => {
        MotherBetProvider.getMotherBetsList().then(
            list => setMotherBets(list)
        )
    }, [])

    return (
        <div className='flex flex-col w-screen h-screen'>
            <NavBar cart={cart}></NavBar>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            <SearchResults motherBets={motherBets} />
        </div>
    );
};