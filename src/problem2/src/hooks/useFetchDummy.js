import { useState, useEffect } from "react";
import data from "../data/dummy.json";

export const useFetchDummy = () => {
    const [currencies, setCurrencies] = useState(null);
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDummy = async () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setCurrencies(data.currencies);
                setBalance(data.balance);
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDummy();
    }, []);

    return { balance, currencies, error, loading };
}