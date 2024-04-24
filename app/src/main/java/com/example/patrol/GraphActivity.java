package com.example.patrol;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.graphics.Color;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.formatter.ValueFormatter;
import com.github.mikephil.charting.utils.ColorTemplate;

import java.util.ArrayList;
import java.util.List;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class GraphActivity extends AppCompatActivity {
    private TextView textViewStatus, textViewConfirmedCases, textViewDeaths;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_graph);
        textViewStatus = findViewById(R.id.tvStatus);
        textViewConfirmedCases = findViewById(R.id.tvConfirmedCases);
        textViewDeaths = findViewById(R.id.tvDeaths);
        TextView tvCityName = findViewById(R.id.tvCityName);
        String cityName = getIntent().getStringExtra("city_name"); // Make sure to pass "city_name" from the previous activity

        tvCityName.setText("City Name: " + cityName);

        // Get data from Intent
        int confirmedDiff = getIntent().getIntExtra("confirmed_diff", 0);
        int confirmed = getIntent().getIntExtra("confirmed", 0);
        int deaths = getIntent().getIntExtra("deaths", 0);

        // Update TextViews
        textViewStatus.setText(confirmedDiff > 50 ? "BUSY" : "NOT BUSY");
        textViewStatus.setTextColor(confirmedDiff > 50 ? Color.RED : Color.GREEN);
        textViewConfirmedCases.setText("Current Crowd today: " + confirmed);
        textViewDeaths.setText("Crowd difference from yesterday " + deaths);

        fetchHistoricalData();

    }

    private void fetchHistoricalData() {

        String cityName = getIntent().getStringExtra("city_name");
        if (cityName == null) cityName = "default_city"; // fallback if no city name is provided

        // Encode the city name to handle spaces and other characters
        cityName = Uri.encode(cityName);

        // Update the URL to include the city name
        String url = "http://10.0.2.2:5001/api/historical_data/" + cityName;

        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest stringRequest = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        parseHistoricalData(response); // Parse and display data
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // Handle error
                Log.e("GraphActivity", "Error fetching historical data: " + error.toString());
            }
        });

        queue.add(stringRequest);
    }


    private void parseHistoricalData(String jsonData) {
        try {
            JSONObject jsonObject = new JSONObject(jsonData);
            JSONArray weekArray = jsonObject.getJSONArray("week");

            List<BarEntry> entries = new ArrayList<>();
            for (int i = 0; i < weekArray.length(); i++) {
                JSONObject dayObject = weekArray.getJSONObject(i);
                String day = dayObject.getString("day");
                int percentage = dayObject.getInt("percentage");
                entries.add(new BarEntry(i, percentage)); // i is the x-axis value, percentage is the y-axis value
            }

            setupBarChart(entries); // Method to set up the bar chart
        } catch (JSONException e) {
            Log.e("GraphActivity", "JSON parsing error: " + e.getMessage());
        }
    }

    private void setupBarChart(List<BarEntry> entries) {
        BarChart chart = findViewById(R.id.barChart);

        BarDataSet dataSet = new BarDataSet(entries, "Daily Activity");
        dataSet.setColors(ColorTemplate.MATERIAL_COLORS);
        BarData barData = new BarData(dataSet);

        chart.setData(barData);
        chart.getDescription().setEnabled(false); // Disable the description
        chart.getXAxis().setValueFormatter(new DayAxisValueFormatter()); // Custom formatter for x-axis labels
        chart.animateY(1500); // Animate the chart
        chart.invalidate(); // Refresh the chart
    }

    // Custom formatter for x-axis labels
    private class DayAxisValueFormatter extends ValueFormatter {
        private final String[] daysOfWeek = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};

        @Override
        public String getFormattedValue(float value) {
            return daysOfWeek[(int) value % daysOfWeek.length];
        }
    }
}




