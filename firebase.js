import Firestore from '@google-cloud/firestore';

// Use your project ID here
const PROJECTID = 'molten-infusion-359517';

const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
  keyFilename: process.env.HOME + '/.config/gcloud/application_default_credentials.json'
});

export const addEntry = async (data) => {
  const col = firestore.collection('markets/' + data.address + '/data');
  col.add(data);
}
