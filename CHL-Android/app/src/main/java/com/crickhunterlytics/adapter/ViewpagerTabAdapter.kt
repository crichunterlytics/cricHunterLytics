package com.crickhunterlytics.adapter

import android.os.Bundle
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import androidx.lifecycle.Lifecycle
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.crickhunterlytics.fragement.SeriesList
import com.crickhunterlytics.fragement.SeriesList.Companion.ARG_SERIES_TYPE

class ViewpagerTabAdapter (fragmentManager: FragmentManager,lifecycle: Lifecycle) :
    FragmentStateAdapter(fragmentManager,lifecycle) {
    override fun getItemCount(): Int {
        return 4
    }

    //positioning fragments in tablayout list
    override fun createFragment(position: Int): Fragment {
        return when (position) {
            0 -> {
                val bundle = Bundle()
                //bundle.putString(ARG_SERIES_TYPE, "international")
                val seriesList=SeriesList.newInstance("international")
                seriesList
            }
            1 -> {
                val seriesList=SeriesList.newInstance("league")
                seriesList
            }
            2 -> {
                val seriesList=SeriesList.newInstance("domestic")
                seriesList
            }
            3 -> {
                val seriesList=SeriesList.newInstance("women")
                seriesList
            }
            else -> {
                val seriesList=SeriesList.newInstance("international")
                seriesList
            }
        }
    }
}