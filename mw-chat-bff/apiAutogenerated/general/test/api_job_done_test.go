/*
Masters way API

Testing JobDoneAPIService

*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech);

package openapi

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func Test_openapi_JobDoneAPIService(t *testing.T) {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)

	t.Run("Test JobDoneAPIService CreateJobDone", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		resp, httpRes, err := apiClient.JobDoneAPI.CreateJobDone(context.Background()).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test JobDoneAPIService DeleteJobDone", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var jobDoneId string

		httpRes, err := apiClient.JobDoneAPI.DeleteJobDone(context.Background(), jobDoneId).Execute()

		require.Nil(t, err)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test JobDoneAPIService UpdateJobDone", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var jobDoneId string

		resp, httpRes, err := apiClient.JobDoneAPI.UpdateJobDone(context.Background(), jobDoneId).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

}
