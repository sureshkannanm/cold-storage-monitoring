import * as Realm from 'realm-web';

let mongodb = null;
/* eslint-disable-next-line no-restricted-globals */
self.onmessage = async (e) => {
  console.debug('OnMessage', e);
  const command = e?.data.command;
  excuteAction(command, e?.data);
};

const initApp = async () => {
  const app = new Realm.App({ id: process.env.REACT_APP_APP_NAME });
  await app.logIn(Realm.Credentials.anonymous());
  const mongo = app.currentUser?.mongoClient('mongodb-atlas');

  //   const collection = mongo
  //   ?.db(process.env.REACT_APP_DB_NAME)
  //   .collection('timeseries');
  // const dataFromCollection = await collection?.find();

  // console.log(1,process.env.REACT_APP_DB_NAME,dataFromCollection)

  return mongo;
};

const excuteAction = async (command, data) => {
  switch (command) {
    case 'init':
      mongodb = await initApp();
      postMessage({ message: 'init', data: null });
      break;
    case 'find':
      const collection = mongodb
        ?.db(process.env.REACT_APP_DB_NAME)
        .collection(data.collection);
      const dataFromCollection = await collection?.find();
      postMessage({
        message: 'find-' + data.collection,
        data: dataFromCollection,
      });
      break;
    case 'findMany':
      const result = [];
      const coll = mongodb
        ?.db(process.env.REACT_APP_DB_NAME)
        .collection(data.collection);
      if(data.queryInputs.length>0){

        for(const asset of data.queryInputs){
            const query= {}
            query[data.queryField] = asset
            const a = await coll?.aggregate([{$match:query}, {$sort:{'timestamp':-1}}, {'$limit': 50}])
            result.push(a)
        }

        postMessage({
          message: 'findMany-' + data.collection,   
          data: result,
        });
      }

      break;
    default:
      console.error('Case Not Found');
      throw new Error('Case Not Found');
  }
};
