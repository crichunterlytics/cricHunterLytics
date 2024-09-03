package com.crickhunterlytics

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.crickhunterlytics.apiCallUtility.ApiClient
import com.crickhunterlytics.databinding.ActivityMainBinding
import com.crickhunterlytics.fragement.HomeFragment
import com.crickhunterlytics.fragement.MySeriesList
import com.crickhunterlytics.fragement.SeriesList
import com.crickhunterlytics.model.SeriesListModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    lateinit var binding: ActivityMainBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
         binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
setSupportActionBar(binding.toolbar)
        loadFragment(HomeFragment())
        binding.toolbar.setNavigationOnClickListener { finish() }
        binding.bottomNav.setOnItemSelectedListener {
            when (it.itemId) {
                R.id.home -> {
                    loadFragment(HomeFragment())
                    true
                }
                R.id.message -> {
                    loadFragment(MySeriesList())
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
    }
    private  fun loadFragment(fragment: Fragment){
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container,fragment)
        transaction.commit()
    }
}