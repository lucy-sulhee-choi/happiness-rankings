import happyImage from "./happy.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <img src={happyImage} className="d-block w-100" alt="worldmap" />
      <div className="d-flex justify-content-center">
      <heading className="home-heading">WORLD HAPPINESS RANKINGS</heading>
      </div>
      <div>
      <p className="home-caption-text">Welcome to World Happiness Rankings! </p>
      <p className="home-caption-text">Rankings By Years - Rankings of all countries for the selected year. <span class="badge badge-pill badge-danger">No login required</span> </p>
      <p className="home-caption-text">Rankings By Countries - Rankings of all years for the selected country. <span class="badge badge-pill badge-danger">No login required</span></p>
      <p className="home-caption-text">Rankings with Factors - Rankings with factors of all countries for the selected year. <span class="badge badge-pill badge-info">Login required</span></p>
      <p className="home-caption-text">Compare Factors - Rankings of two selected countries for each selected year. <span class="badge badge-pill badge-info">Login required</span></p>
      <p className="home-caption-text-bottom">HAPPY EXPLORING!</p>

    </div></div>
  );
}