package com.crickhunterlytics.model

import com.google.gson.annotations.SerializedName

data class SeriesListModel (

    @SerializedName("data" ) var data : ArrayList<Data> = arrayListOf(),
    @SerializedName("err"  ) var err  : Boolean?        = null

)
data class Data (

    @SerializedName("series_id"          ) var seriesId         : Int?    = null,
    @SerializedName("series_name"        ) var seriesName       : String? = null,
    @SerializedName("start_date"         ) var startDate        : Long?    = null,
    @SerializedName("end_date"           ) var endDate          : Long?    = null,
    @SerializedName("series_type"        ) var seriesType       : String? = null,
    @SerializedName("series_header_text" ) var seriesHeaderText : String? = null

)