gcloud functions deploy scan \
  --env-vars-file .env.yaml \
  --gen2 \
  --runtime=nodejs16 \
  --source=. \
  --region=us-east1 \
  --entry-point=syncRun \
  --trigger-topic=contract_metadata
