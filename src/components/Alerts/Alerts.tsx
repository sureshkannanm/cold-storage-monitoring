import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

let app: any;
if (process.env.REACT_APP_APP_NAME) {
  app = new Realm.App({ id: process.env.REACT_APP_APP_NAME });
} else {
  throw new Error('App id is not Available');
}

const Alerts = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const login = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);

      const mongodb = app.currentUser?.mongoClient('mongodb-atlas');
      console.log('Mongo DB connection ', mongodb);
      const collection = mongodb
        ?.db(process.env.REACT_APP_DB_NAME)
        .collection(process.env.REACT_APP_COLLECTION_NAME);
      console.log('Mongo DB collection', await collection?.find());

      // @ts-ignore: Object is possibly 'null'.
      for await (const change of collection?.watch()) {
        console.log(change);
        setEvents((events) => [...events, change]);
      }
    };

    login();
  }, []);

  return <div> This is Alerts Page </div>;
};

export default Alerts;
