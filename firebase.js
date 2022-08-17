import Firestore from '@google-cloud/firestore';

// Use your project ID here
const PROJECTID = 'molten-infusion-359517';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

export const addEntry = async (data) => {
  console.log(data)
  try {
    const col = firestore.collection('markets/' + data.address + '/data');
    col.add(data);
  }
  catch (error) { console.log('Firebase Authentication Failed'); }
}
