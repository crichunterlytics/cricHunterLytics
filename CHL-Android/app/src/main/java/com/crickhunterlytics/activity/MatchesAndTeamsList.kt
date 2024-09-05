package com.crickhunterlytics.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.databinding.DataBindingUtil
import com.crickhunterlytics.R
import com.crickhunterlytics.adapter.MatchesAndTeamsPagerAdapter
import com.crickhunterlytics.adapter.ViewpagerTabAdapter
import com.crickhunterlytics.databinding.ActivityMainBinding
import com.crickhunterlytics.databinding.ActivityMatchesAndTeamsListBinding
import com.crickhunterlytics.fragement.HomeFragment
import com.google.android.material.tabs.TabLayoutMediator

class MatchesAndTeamsList : AppCompatActivity() {
    private lateinit var binding: ActivityMatchesAndTeamsListBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_matches_and_teams_list)
        setSupportActionBar(binding.toolbar)
        binding.toolbar.setNavigationOnClickListener { finish() }

        val adapter = MatchesAndTeamsPagerAdapter(supportFragmentManager, lifecycle)
        binding.viewPager.adapter = adapter

        //Add string texts to tabs of tabLayout
        TabLayoutMediator(binding.tabLayout, binding.viewPager) { tab, position ->
            when (position) {
                0 -> {
                    tab.text = getString(R.string.matches)
                }
                1 -> {
                    tab.text = getString(R.string.teams)
                }

            }
        }.attach()
    }
}