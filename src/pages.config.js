import Calendar from './pages/Calendar';
import Events from './pages/Events';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Calendar": Calendar,
    "Events": Events,
    "Home": Home,
    "Jobs": Jobs,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};