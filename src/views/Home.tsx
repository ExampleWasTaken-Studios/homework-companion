import { Homework } from "../components/home/Homework";
import { Sidebar } from "../components/utils/Sidebar";

export const Home = () => {  
  return (
    <div className="container">
      <Sidebar activeItem="home"/>
      <Homework/>
    </div>
  );
};