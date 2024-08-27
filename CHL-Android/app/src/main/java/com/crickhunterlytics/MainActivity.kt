package com.crickhunterlytics

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.crickhunterlytics.apiCallUtility.ApiClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        getSeriesList()
    }

    private fun getSeriesList() {
        val call = ApiClient.apiService.getPostById(postId)

        call.enqueue(object : Callback<Post> {
            override fun onResponse(call: Call<Post>, response: Response<Post>) {
                if (response.isSuccessful) {
                    val post = response.body()
                    // Handle the retrieved post data
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<Post>, t: Throwable) {
                // Handle failure
            }
        })
    }
}