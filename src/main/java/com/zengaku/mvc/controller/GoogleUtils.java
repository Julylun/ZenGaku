package com.zengaku.mvc.controller;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.googleapis.services.AbstractGoogleClient;
import com.google.api.client.googleapis.services.json.AbstractGoogleJsonClient;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.Permission;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.zengaku.mvc.model.DTO.GoogleRes;
import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;


import java.io.*;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;

public class GoogleUtils {
    /**
     * Application name.
     */
    private static final String APPLICATION_NAME = "Google Drive API Java Quickstart";
    /**
     * Global instance of the JSON factory.
     */
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    /**
     * Directory to store authorization tokens for this application.
     */
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final List<String> SCOPES =
            Collections.singletonList(DriveScopes.DRIVE_METADATA_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    public static final String AVATAR_FOLDER_ID = "17lula8yzgDtq_ntCuVISTzBLZKxI0wyU";


    public static GoogleRes uploadImageToDrive(File file, String folderId){
        GoogleRes res = new GoogleRes();

        try {
        Drive drive = createDriveService();

        com.google.api.services.drive.model.File fileMetaData = new com.google.api.services.drive.model.File();

        fileMetaData.setName(file.getName());
        fileMetaData.setParents(Collections.singletonList(folderId));
        FileContent mediaContent = new FileContent("image/*", file);

            com.google.api.services.drive.model.File uploadFile =
                    drive.files().create(fileMetaData,mediaContent).setFields("id").execute();

            Permission permission = new Permission();
            permission.setType("anyone");
            permission.setRole("reader");
            drive.permissions().create(uploadFile.getId(),permission).execute();
//            String imageUrl = "https://drive.google.com/uc?export=view&id="+uploadFile.getId();
            String imageUrl = "https://lh3.googleusercontent.com/d/" + uploadFile.getId() + "=w1000?authuser=0";

            file.delete();

            res.setStatus(200);
            res.setMessage("Upload successfully");
            res.setUrl(imageUrl);
        } catch (Exception e) {
            res.setStatus(500);
            res.setMessage(e.getMessage());
            e.printStackTrace();
        }
        return res;

    }
    public static Drive createDriveService() {
        GoogleCredentials credentials = null;
        try {

            System.out.println(GoogleUtils.class.getResource("/credentials.json").getPath());
            InputStream credentialsStream = GoogleUtils.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
            if (credentialsStream == null) {
                throw new IOException("Resource not found: " + CREDENTIALS_FILE_PATH);
            }
            credentials = GoogleCredentials.fromStream(credentialsStream)
                    .createScoped(Arrays.asList(DriveScopes.DRIVE));

            HttpRequestInitializer httpRequestInitializer = new HttpCredentialsAdapter(credentials);

            // Build a new authorized API client service.
            GoogleNetHttpTransport.newTrustedTransport();

            Drive.Builder builder =  new Drive.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JSON_FACTORY,
                    httpRequestInitializer);

            Drive drive = builder.build();

            return drive;
        }catch (IOException e) {
            System.err.println("IOException: " + e.getMessage());
            e.printStackTrace();
            return null;
        } catch (GeneralSecurityException e) {
            System.err.println("GeneralSecurityException: " + e.getMessage());
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT)
            throws IOException {
        try{
            InputStream in = GoogleUtils.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
            if (in == null) {
                throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
            }
            GoogleClientSecrets clientSecrets =
                    GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

            // Build flow and trigger user authorization request.
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                    .setAccessType("offline")
                    .build();
            LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
            Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
            //returns an authorized Credential object.
            return credential;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
        // Load client secrets.

    }
}
