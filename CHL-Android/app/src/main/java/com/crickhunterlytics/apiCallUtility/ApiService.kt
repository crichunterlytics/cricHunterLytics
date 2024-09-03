package com.crickhunterlytics.apiCallUtility

import com.crickhunterlytics.model.MatchesListModel
import com.crickhunterlytics.model.SeriesListModel
import com.crickhunterlytics.model.TeamsListModel
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface ApiService {
   @GET("api/series/series_list/{id}")
    fun getSeriesList(@Path("id") postId: String): Call<SeriesListModel>

    @GET("api/series/series_matches/{id}")
    fun getMatchesList(@Path("id") postId: String): Call<MatchesListModel>
    @GET("api/series/teams_list/{id}")
    fun getTeamsList(@Path("id") postId: String): Call<TeamsListModel>
}