package com.crickhunterlytics.adapter

import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Button
import android.widget.RelativeLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.crickhunterlytics.AppUtility.CommanUtility
import com.crickhunterlytics.databinding.FragmentSeriesListBinding
import com.crickhunterlytics.databinding.TeamListItemBinding
import com.crickhunterlytics.interfaceClass.ListItemClickListener
import com.crickhunterlytics.model.MatchesData
import com.crickhunterlytics.model.TeamsData

class TeamsListAdapter (
    private val values: ArrayList<TeamsData>,
    private val  mListItemListener: ListItemClickListener
) : RecyclerView.Adapter<TeamsListAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        return ViewHolder(
            TeamListItemBinding.inflate(
                LayoutInflater.from(parent.context),
                parent,
                false
            )
        )

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val item = values[position]
        holder.contentView.text = item.teamName


        holder.rlyt.setOnClickListener { mListItemListener.onItemClick(position) }
    }

    override fun getItemCount(): Int = values.size

    inner class ViewHolder(binding: TeamListItemBinding) :
        RecyclerView.ViewHolder(binding.root) {
        val contentView: TextView = binding.txtTeamName
        val rlyt: RelativeLayout = binding.rlytListItem

        override fun toString(): String {
            return super.toString() + " '" + contentView.text + "'"
        }
    }

}