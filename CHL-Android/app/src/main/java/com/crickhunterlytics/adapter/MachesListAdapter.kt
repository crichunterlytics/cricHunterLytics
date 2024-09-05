package com.crickhunterlytics.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.crickhunterlytics.AppUtility.CommanUtility
import com.crickhunterlytics.databinding.FragmentSeriesListBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.MatchesData

class MachesListAdapter (
    private val values: ArrayList<MatchesData>,
    private val  mListItemListener: ListItemClickListener
) : RecyclerView.Adapter<MachesListAdapter.ViewHolder>() {

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
        holder.contentView.text = item.matchNumberText


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