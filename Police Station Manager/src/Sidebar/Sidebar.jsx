import './Sidebar.css' 




function Sidebar(){

    return(<div className="sidebar">  
        <div id="createNewOption" className="option">Police Officer</div>
        <div id="createNewOption" className="option">Police Station</div>
        <div id="createNewOption" className="option">Suspect</div>
        <div id="createNewOption" className="option">Incident</div>
        <div id="createNewOption" className="option">Equiptment</div>
        <div id="createNewOption" className="option">Warrant</div>       
    </div>);
}

export default Sidebar;