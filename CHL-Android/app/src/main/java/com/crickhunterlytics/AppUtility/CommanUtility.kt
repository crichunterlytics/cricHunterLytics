package com.crickhunterlytics.AppUtility

import android.content.Context
import android.widget.ImageView
import com.crickhunterlytics.R
import com.squareup.picasso.Picasso
import java.text.SimpleDateFormat
import java.util.Date

object CommanUtility {
    fun dateFormat(timeStamp: Long): String {
        try {
            val sdf = SimpleDateFormat("dd MMM yyyy")
            val netDate = Date(timeStamp)
            return sdf.format(netDate)
        } catch (e: Exception) {
            return e.toString()
        }
    }
    fun imageLoading(imageView: ImageView,url: String){
        Picasso.get()
            .load(url)
            .placeholder(R.drawable.ic_profile_select) // Optional: placeholder while loading
            .error(R.drawable.ic_profile_select) // Optional: error image if loading fails
            .into(imageView)

    }
}