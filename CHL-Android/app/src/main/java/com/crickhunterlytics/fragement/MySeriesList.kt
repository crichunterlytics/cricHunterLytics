package com.crickhunterlytics.fragement

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.crickhunterlytics.R
import com.crickhunterlytics.adapter.MySeriesItemRecyclerViewAdapter
import com.crickhunterlytics.apiCallUtility.ApiClient
import com.crickhunterlytics.databinding.FragmentSeriesListListBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.SeriesListModel
import com.google.gson.Gson
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MySeriesList : Fragment(), ListItemClickListener {

    private lateinit var binding: FragmentSeriesListListBinding
    private var columnCount = 1

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        arguments?.let {
            columnCount = it.getInt(ARG_COLUMN_COUNT)
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
        const val ARG_COLUMN_COUNT = "column-count"

        // TODO: Customize parameter initialization
        @JvmStatic
        fun newInstance(columnCount: Int) =
            SeriesList().apply {
                arguments = Bundle().apply {
                    putInt(ARG_COLUMN_COUNT, columnCount)
                }
            }
    }
    private fun getSeriesList() {
        var seriesListString="{\n" +
                "    \"data\": [\n" +
                "        {\n" +
                "            \"series_id\": 7855,\n" +
                "            \"series_name\": \"Caribbean Premier League 2024\",\n" +
                "            \"start_date\": 1724889600000,\n" +
                "            \"end_date\": 1728172800000,\n" +
                "            \"series_type\": \"league\",\n" +
                "            \"series_header_text\": \"AUGUST 2024\",\n" +
                "            \"id\": 2,\n" +
                "            \"user_id\": 2\n" +
                "        },\n" +
                "        {\n" +
                "            \"series_id\": 8393,\n" +
                "            \"series_name\": \"Bangladesh tour of India, 2024\",\n" +
                "            \"start_date\": 1726704000000,\n" +
                "            \"end_date\": 1728691200000,\n" +
                "            \"series_type\": \"international\",\n" +
                "            \"series_header_text\": \"SEPTEMBER 2024\",\n" +
                "            \"id\": 3,\n" +
                "            \"user_id\": 2\n" +
                "        }\n" +
                "    ],\n" +
                "    \"err\": false\n" +
                "}"
        var seriesListModel= Gson().fromJson(seriesListString, SeriesListModel::class.java)
        // Set the adapter
        binding.list.adapter= MySeriesItemRecyclerViewAdapter(seriesListModel.data,true,this)
        val call = ApiClient.apiService.getSeriesList("league")

        call.enqueue(object : Callback<SeriesListModel> {
            override fun onResponse(call: Call<SeriesListModel>, response: Response<SeriesListModel>) {
                if (response.isSuccessful) {
                    val post = response.body()
                    // Handle the retrieved post data
                } else {
                    // Handle error
                }
            }

            override fun onFailure(call: Call<SeriesListModel>, t: Throwable) {
                // Handle failure
            }
        })
    }

    override fun onItemClick(position: Int) {

    }

    override fun onItemButtonClick(position: Int) {
    }

}