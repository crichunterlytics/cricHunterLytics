package com.crickhunterlytics.fragement

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.crickhunterlytics.R
import com.crickhunterlytics.activity.MatchesAndTeamsList
import com.crickhunterlytics.adapter.MachesListAdapter
import com.crickhunterlytics.adapter.TeamsListAdapter
import com.crickhunterlytics.apiCallUtility.ApiClient
import com.crickhunterlytics.databinding.FragmentSeriesListListBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.MatchesListModel
import com.crickhunterlytics.model.TeamsListModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TeamsList : Fragment(), ListItemClickListener {

    private lateinit var binding: FragmentSeriesListListBinding
    private var seriseType = " "

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            seriseType = it.getString(ARG_SERIES_TYPE).toString()
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_series_list_list, container, false)
        getTeamsList()
        return binding.root
    }

    companion object {

        // TODO: Customize parameter argument names
        const val ARG_SERIES_TYPE = "series_type"

        // TODO: Customize parameter initialization
        @JvmStatic
        fun newInstance(seriesTypeLocal: String) =
            TeamsList().apply {
                arguments = Bundle().apply {
                    putString(ARG_SERIES_TYPE, seriesTypeLocal)
                }
            }
    }
    private fun getTeamsList() {

        val call = ApiClient.apiService.getTeamsList(seriseType)

        call.enqueue(object : Callback<TeamsListModel> {
            override fun onResponse(call: Call<TeamsListModel>, response: Response<TeamsListModel>) {
                if (response.isSuccessful) {
                    val post = response.body()
                    if (post != null&& post.err == false) {
                        binding.list.adapter= TeamsListAdapter(post.data, this@TeamsList)
                    }

                    // Handle the retrieved post data
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<TeamsListModel>, t: Throwable) {
                // Handle failure
                t.message?.let {
                    Log.e("tag", it)
                }
                t.printStackTrace()
            }
        })
    }

    override fun onItemClick(position: Int) {
        val intent = Intent(activity, MatchesAndTeamsList::class.java)
        startActivity(intent)
    }

    override fun onItemButtonClick(position: Int) {
    }

}