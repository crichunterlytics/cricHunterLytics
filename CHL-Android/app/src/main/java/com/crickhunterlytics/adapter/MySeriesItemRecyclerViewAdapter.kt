package com.crickhunterlytics.adapter

import androidx.recyclerview.widget.RecyclerView
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.RelativeLayout
import android.widget.TextView
import com.crickhunterlytics.AppUtility.CommanUtility

import com.crickhunterlytics.fragement.placeholder.PlaceholderContent.PlaceholderItem
import com.crickhunterlytics.databinding.FragmentSeriesListBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.Data

/**
 * [RecyclerView.Adapter] that can display a [PlaceholderItem].
 * TODO: Replace the implementation with code for your data type.
 */
class MySeriesItemRecyclerViewAdapter(
    private val values: ArrayList<Data>,
    private val isFormMylist: Boolean,
    private val  mListItemListener: ListItemClickListener
) : RecyclerView.Adapter<MySeriesItemRecyclerViewAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            FragmentSeriesListBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = values[position]
        holder.txtStartDate.text = "Start Date : "+item.startDate?.let { CommanUtility.dateFormat(it) }
        holder.txtEndDate.text = "End Date : "+item.endDate?.let { CommanUtility.dateFormat(it) }
        holder.contentView.text = item.seriesName
        if(isFormMylist){
            holder.btnAddToList.visibility=View.GONE
        }else{
            holder.btnAddToList.visibility=View.VISIBLE

        }

        holder.rlyt.setOnClickListener { mListItemListener.onItemClick(position) }
    }

    override fun getItemCount(): Int = values.size

    inner class ViewHolder(binding: FragmentSeriesListBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val txtStartDate: TextView = binding.txtStartDate
        val txtEndDate: TextView = binding.txtEndDate
        val contentView: TextView = binding.content
        val btnAddToList: Button = binding.btnAddToList
        val rlyt: RelativeLayout = binding.rlytListItem

        override fun toString(): String {
            return super.toString() + " '" + contentView.text + "'"
        }
    }

}