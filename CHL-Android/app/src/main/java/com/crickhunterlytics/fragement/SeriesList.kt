package com.crickhunterlytics.fragement

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.crickhunterlytics.R
import com.crickhunterlytics.activity.MatchesAndTeamsList
import com.crickhunterlytics.adapter.MySeriesItemRecyclerViewAdapter
import com.crickhunterlytics.apiCallUtility.ApiClient
import com.crickhunterlytics.databinding.FragmentSeriesListListBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.SeriesListModel
import com.google.gson.Gson
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

/**
 * A fragment representing a list of Items.
 */
class SeriesList : Fragment(),ListItemClickListener {

    private lateinit var binding: FragmentSeriesListListBinding
    private var seriseType = "international"

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
        getSeriesList()
        return binding.root
    }

    companion object {

        // TODO: Customize parameter argument names
        const val ARG_SERIES_TYPE = "series_type"

        // TODO: Customize parameter initialization
        @JvmStatic
        fun newInstance(seriesTypeLocal: String) =
            SeriesList().apply {
                arguments = Bundle().apply {
                    putString(ARG_SERIES_TYPE, seriesTypeLocal)
                }
            }
    }
    private fun getSeriesList() {
        /*var seriesListString="{\n" +
                "    \"data\": [\n" +
                "        {\n" +
                "            \"series_id\": 7855,\n" +
                "            \"series_name\": \"Caribbean Premier League 2024\",\n" +
                "            \"start_date\": 1724889600000,\n" +
                "            \"end_date\": 1728172800000,\n" +
                "            \"series_type\": \"league\",\n" +
                "            \"series_header_text\": \"AUGUST 2024\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"series_id\": 8393,\n" +
                "            \"series_name\": \"Bangladesh tour of India, 2024\",\n" +
                "            \"start_date\": 1726704000000,\n" +
                "            \"end_date\": 1728691200000,\n" +
                "            \"series_type\": \"international\",\n" +
                "            \"series_header_text\": \"SEPTEMBER 2024\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"series_id\": 8552,\n" +
                "            \"series_name\": \"Australia tour of Scotland, 2024\",\n" +
                "            \"start_date\": 1725408000000,\n" +
                "            \"end_date\": 1725667200000,\n" +
                "            \"series_type\": \"international\",\n" +
                "            \"series_header_text\": \"SEPTEMBER 2024\"\n" +
                "        },\n" +
                "        {\n" +
                "            \"series_id\": 8643,\n" +
                "            \"series_name\": \"CSA T20 Challenge 2024\",\n" +
                "            \"start_date\": 1727395200000,\n" +
                "            \"end_date\": 1729987200000,\n" +
                "            \"series_type\": \"league\",\n" +
                "            \"series_header_text\": \"SEPTEMBER 2024\"\n" +
                "        }\n" +
                "    ],\n" +
                "    \"err\": false\n" +
                "}"
        var seriesListModel=Gson().fromJson(seriesListString,SeriesListModel::class.java)*/
        // Set the adapter
        val call = ApiClient.apiService.getSeriesList(seriseType)

        call.enqueue(object : Callback<SeriesListModel> {
            override fun onResponse(call: Call<SeriesListModel>, response: Response<SeriesListModel>) {
                if (response.isSuccessful) {
                    val post = response.body()
                    if (post != null&& post.err == false) {
                        binding.list.adapter= MySeriesItemRecyclerViewAdapter(post.data, true, this@SeriesList)
                    }

                    // Handle the retrieved post data
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<SeriesListModel>, t: Throwable) {
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