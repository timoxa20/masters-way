/*
Masters way API

Testing PlanAPIService

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

func Test_openapi_PlanAPIService(t *testing.T) {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)

	t.Run("Test PlanAPIService CreatePlan", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		resp, httpRes, err := apiClient.PlanAPI.CreatePlan(context.Background()).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test PlanAPIService DeletePlan", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var planId string

		httpRes, err := apiClient.PlanAPI.DeletePlan(context.Background(), planId).Execute()

		require.Nil(t, err)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test PlanAPIService UpdatePlan", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var planId string

		resp, httpRes, err := apiClient.PlanAPI.UpdatePlan(context.Background(), planId).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

}
