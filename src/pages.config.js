import Calendar from './pages/Calendar';
import Community from './pages/Community';
import Events from './pages/Events';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Mission from './pages/Mission';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Calendar": Calendar,
    "Community": Community,
    "Events": Events,
    "Home": Home,
    "Jobs": Jobs,
    "Mission": Mission,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};