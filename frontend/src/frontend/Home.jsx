import "../index.css";
import BasePage from "../assets/BasePage";

class Home extends BasePage {

    getTitle = () => {
        return "Home"
    }

  renderBody() {
    return (
      <>
        <h2>{this.getTitle()}</h2>
        
      </>
    );
  }
}

export default Home;
