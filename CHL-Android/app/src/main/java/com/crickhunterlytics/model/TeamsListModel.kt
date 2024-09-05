package com.crickhunterlytics.model

import com.google.gson.annotations.SerializedName


data class TeamsListModel (

    @SerializedName("data" ) var data : ArrayList<TeamsData> = arrayListOf(),
    @SerializedName("err"  ) var err  : Boolean?        = null

)
data class TeamsData (

    @SerializedName("team_id"   ) var teamId   : Int?    = null,
    @SerializedName("team_name" ) var teamName : String? = null,
    @SerializedName("image_id"  ) var imageId  : Int?    = null,
    @SerializedName("squad_id"  ) var squadId  : Int?    = null,
    @SerializedName("series_id" ) var seriesId : Int?    = null

)