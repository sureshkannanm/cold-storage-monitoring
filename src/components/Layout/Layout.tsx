import { Route, Routes } from 'react-router-dom';

import './Layout.scss';

import Header from '../Header/Header';
import React, { useEffect, useState } from 'react';

const Dashboard = React.lazy(() => import('../Dashboard/Dashboard'));
const Alerts = React.lazy(() => import('../Alerts/Alerts'));

const Layout = () => {
  const [worker, setWorker] = useState<any>(null); 
  const [assets, setAssets] = useState<string[]>([]);
  const [timeSeries, setTimeSeries] = useState<any[]>([]);

  useEffect(() => {
    const mainWorker = new Worker(
      new URL('../../workers/worker.js', import.meta.url)
    );
    console.debug('connecting to  Worker ');
    setWorker(mainWorker);
    return () => {
      console.debug('Terminating Worker ');
      worker?.terminate();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (worker) {
      worker.addEventListener('message', (event: any) => {
        console.debug(event);
        if (event.data.message === 'init') {
          worker.postMessage({
            command: 'find',
            collection: process.env.REACT_APP_COLLECTION_ASSETS,
          });
        }

        if (event.data.message === 'find-assets') {
          const assets: string[] = [];
          event.data.data.forEach((obj: any) => {
            assets.push(obj.assetId);
          });
          setAssets(assets);
        }

        if (event.data.message === 'findMany-timeseries') {
          console.debug('findMany-timeseries ',event.data.data)
          setTimeSeries(event.data.data);
        }
      });

      worker.postMessage({
        command: 'init',
      });
    }
  }, [worker]);

  useEffect(() => {
    if (assets.length > 0)
      worker.postMessage({
        command: 'findMany',
        collection: process.env.REACT_APP_COLLECTION_TIME,
        queryField: 'assetId',
        queryInputs: assets,
      });
  }, [assets]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="Layout">
      <Header></Header>
      <div className="Layout-content">
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback="Loading .... ">
                <Dashboard timeSeries={timeSeries}/>
              </React.Suspense>
            }
          />
          <Route
            path="/alerts"
            element={
              <React.Suspense fallback="Loading .... ">
                <Alerts />
              </React.Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
