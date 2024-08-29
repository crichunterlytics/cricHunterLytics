package com.crickhunterlytics

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.crickhunterlytics.apiCallUtility.ApiClient
import com.crickhunterlytics.databinding.ActivityMainBinding
import com.crickhunterlytics.fragement.SeriesList
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
         binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

        binding.bottomNav.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.home -> {
                    loadFragment(SeriesList())
                    true
                }
                R.id.message -> {
                    loadFragment(SeriesList())
                    true
                }
                R.id.settings -> {
                    loadFragment(SeriesList())
                    true
                }

                else -> {
                    loadFragment(SeriesList())
                    true
                }
            }
        }
       // getSeriesList()
    }
    private  fun loadFragment(fragment: Fragment){
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container,fragment)
        transaction.commit()
    }
    /*private fun getSeriesList() {
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
    }*/
}