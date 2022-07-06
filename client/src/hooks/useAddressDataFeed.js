import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { pairs } from '../lib/constants';

export function useAddressDataFeed() {

    const [dataFeeds, setDataFeeds] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const socketRef = useRef();
    const feedPairs = pairs();

    useEffect(() => {
        
        socketRef.current = io("http://localhost:3001");
        feedPairs.forEach(pair => {
            socketRef.current.emit('request_data_feed', {
                feedAddress: pair.feedAddress,
                pair: pair.pair
            });
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
<<<<<<< HEAD
        socketRef.current.on('receive_data_feed', (data_feed) => {
            if(data_feed) {
                setDataFeeds(previousData => {
                    const objIndex = previousData.findIndex((obj => obj.pair ===  data_feed.pair));

                    if(objIndex === -1) {
                        return [...previousData, data_feed];
                    }
                    previousData.splice(objIndex, 1, data_feed);
                    return previousData;
                });
                setRefresh(!refresh);
            }
        });
    }, [refresh]);
    
    useEffect(() => {
        if(dataFeeds.length === feedPairs.length) {
            setIsLoading(false);
=======
        getDataFeeds();
        window.interval3min = setInterval(
            () => getDataFeeds(),
            180000 // 3 minutes
        )
        return () => {
            clearInterval(window.interval3min)
>>>>>>> 20c2b088f1dcb581074f96ea50629019eebbe42c
        }
        // eslint-disable-next-line 
    },[dataFeeds]);

    return {
        dataFeeds,
        isLoading
    };
}