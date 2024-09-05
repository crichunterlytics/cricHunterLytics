package com.crickhunterlytics.adapter

import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.crickhunterlytics.fragement.MatchesListFragment
import com.crickhunterlytics.fragement.SeriesList
import com.crickhunterlytics.fragement.TeamsList

class MatchesAndTeamsPagerAdapter (fragmentManager: FragmentManager, lifecycle: Lifecycle) :
    FragmentStateAdapter(fragmentManager,lifecycle) {
    override fun getItemCount(): Int {
        return 2
    }

    //positioning fragments in tablayout list
    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> {
                val bundle = Bundle()
                //bundle.putString(ARG_SERIES_TYPE, "international")
                val machesList= MatchesListFragment.newInstance("7855")
                machesList
            }
            1 -> {
                val teamsList= TeamsList.newInstance("7855")
                teamsList
            }

            else -> {
                val machesList= MatchesListFragment.newInstance("7855")
                machesList
            }
        }
    }
}