import CurrentWeather from "./currentWeather.jsx";

const Countries = ({countryList, setFilter}) => {
    const handleClick = (country) => () => {
        // The first function takes the country argument, the second executes on click!
        console.log("Country clicked:", country.name.common);
        setFilter(country.name.common);
    };


    if (!countryList) {
        return null;
    }

    const resultLength = countryList.length;

    if (resultLength === 0) {
        return <p>No Countries Found.</p>;
    }

    if (resultLength > 10) {
        return <p>Too many results, Please enter more letters</p>;
    }

    if (resultLength === 1) {
        const country = countryList[0];
        const flag = country.flags
        const languages = Object.values(country.languages);
        return (
            <div>
                <h3>{country.name.common}</h3>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h4>Languages:</h4>
                {languages.map(lang => <div key={lang}>{lang}</div>)}
                <img src={ flag.png} alt={flag.alt}/>
                <CurrentWeather capitalInfo={country.capitalInfo} />
            </div>

        );
    }

    // resultLength is between 2 and 10
    return (
        <div>
            {countryList.map(c => (
                <div key={c.name.common}>
                    <h3>{c.name.common}</h3>
                    <button onClick={handleClick(c)}>show</button>
                </div>
            ))}
        </div>
    );
}
export default Countries;