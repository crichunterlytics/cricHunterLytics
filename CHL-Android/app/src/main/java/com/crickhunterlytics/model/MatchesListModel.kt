package com.crickhunterlytics.model

import com.google.gson.annotations.SerializedName


data class MatchesListModel (

    @SerializedName("data" ) var data : ArrayList<MatchesData> = arrayListOf(),
    @SerializedName("err"  ) var err  : Boolean?        = null

)

data class MatchesData (

    @SerializedName("id"                ) var id              : Int?    = null,
    @SerializedName("series_id"         ) var seriesId        : Int?    = null,
    @SerializedName("match_id"          ) var matchId         : Int?    = null,
    @SerializedName("date_display_text" ) var dateDisplayText : String? = null,
    @SerializedName("match_number_text" ) var matchNumberText : String? = null,
    @SerializedName("match_format"      ) var matchFormat     : String? = null,
    @SerializedName("start_date"        ) var startDate       : Long?    = null,
    @SerializedName("end_date"          ) var endDate         : Long?    = null,
    @SerializedName("team1_id"          ) var team1Id         : Int?    = null,
    @SerializedName("team1_name"        ) var team1Name       : String? = null,
    @SerializedName("team1_shortname"   ) var team1Shortname  : String? = null,
    @SerializedName("team1_imageid"     ) var team1Imageid    : Int?    = null,
    @SerializedName("team2_id"          ) var team2Id         : Int?    = null,
    @SerializedName("team2_name"        ) var team2Name       : String? = null,
    @SerializedName("team2_shortname"   ) var team2Shortname  : String? = null,
    @SerializedName("team2_imageid"     ) var team2Imageid    : Int?    = null,
    @SerializedName("ground_id"         ) var groundId        : Int?    = null,
    @SerializedName("ground_name"       ) var groundName      : String? = null,
    @SerializedName("ground_city"       ) var groundCity      : String? = null

)
