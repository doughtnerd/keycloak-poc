terraform init -input=false
terraform plan -input=false -out=tfplan -detailed-exitcode

exitCode=$?

if [[ $exitCode -eq 2 ]]; then
    echo "Applying changes"
    terraform apply -input=false tfplan
fi

if [[ $exitCode -eq 1 ]]; then
    echo "Failed with error"
    exit 1;
fi

if [[ $exitCode -eq 0 ]]; then
    echo "No changes to make"
fi
