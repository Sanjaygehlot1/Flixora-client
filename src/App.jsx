import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentUser } from './Store/AuthSlice';
import { useEffect, useCallback } from 'react';
import HomePageSkeleton from './HomePageSkeleton';

function App() {
    const dispatch = useDispatch();

    const { UserData } = useSelector((state) => state.Auth);

    const fetchCurrentUser = useCallback(async () => {
        try {
            await dispatch(GetCurrentUser()).unwrap();
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (!UserData) {
            fetchCurrentUser();
        }
    }, [fetchCurrentUser, UserData]);

    if (!UserData) {
        return <HomePageSkeleton/>;
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default App;
