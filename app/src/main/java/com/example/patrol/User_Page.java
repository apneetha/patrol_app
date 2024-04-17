package com.example.patrol;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class User_Page extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_page);

        Button b1 = findViewById(R.id.user_preferences);
        b1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an Intent to start the new Activity
                Intent intent = new Intent(User_Page.this, User_Preferences.class);
                startActivity(intent);
            }
        });

        Button b2 = findViewById(R.id.user_settings);
        b2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an Intent to start the new Activity
                Intent intent = new Intent(User_Page.this, User_Settings.class);
                startActivity(intent);
            }
        });

        Button b3 = findViewById(R.id.user_information);
        b3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an Intent to start the new Activity
                Intent intent = new Intent(User_Page.this, User_Information.class);
                startActivity(intent);
            }
        });

        Button b4 = findViewById(R.id.Home);
        b4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create an Intent to start the new Activity
                Intent intent = new Intent(User_Page.this, allow_page.class);
                startActivity(intent);
            }
        });
    }
}