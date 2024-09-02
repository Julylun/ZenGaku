package com.july.zengakuServlet;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.controller.LocalStorage.FileAnalyzer;
import com.zengaku.mvc.model.DefaultData;
import com.zengaku.mvc.model.PrintColor;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import lombok.Data;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Scanner;

public class Default implements ServletContextListener {

    private void readToxicWord(ServletContextEvent sce) {
        Scanner sc = null;
        try {
            System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "[Default]: Server -> Reading toxic word..." + PrintColor.RESET);
            sc = new Scanner(new File("../webapps/ROOT/WEB-INF/classes/badwords.csv"));
            sc.useDelimiter(",");
            //setting comma as delimiter pattern
            while (sc.hasNext()) {
                String tmp = sc.next();
                DefaultData.badWords.add(tmp);
//                System.out.println(tmp);
            }
            System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "[Default]: Server -> finish reading" + PrintColor.RESET);
            sc.close();
            //closes the scanner
        } catch (Exception e) {
            e.printStackTrace();
        }



    }
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContextListener.super.contextInitialized(sce);
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "--- THE SERVER IS STARTED ---" + PrintColor.RESET);
        System.out.println(PrintColor.GREEN + "Time " + LocalDateTime.now() + PrintColor.RESET);
        readToxicWord(sce);
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "[Default]: Server -> Creating a hibernate session..." + PrintColor.RESET);
        HibernateUtils.getSessionFactory().openSession();
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "--- -*-*-*-*-*-*-*-*-*-*-* ---" + PrintColor.RESET);
//        System.out.println("[LoginServlet]<test>" + FileAnalyzer.readAllTextFromFile(FileAnalyzer.savedDataPath));
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Dừng AbandonedConnectionCleanupThread của MySQL
        AbandonedConnectionCleanupThread.checkedShutdown();
    }
}
