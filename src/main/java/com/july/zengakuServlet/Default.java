package com.july.zengakuServlet;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import com.zengaku.mvc.controller.HibernateUtils;
import com.zengaku.mvc.model.PrintColor;
import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;

public class Default implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContextListener.super.contextInitialized(sce);
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "--- THE SERVER IS STARTED ---" + PrintColor.RESET);
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "[Default]: Server -> Creating a hibernate session..." + PrintColor.RESET);
        HibernateUtils.getSessionFactory().openSession();
        System.out.println(PrintColor.CYAN_BOLD_BRIGHT + "--- -*-*-*-*-*-*-*-*-*-*-* ---" + PrintColor.RESET);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        // Dừng AbandonedConnectionCleanupThread của MySQL
        AbandonedConnectionCleanupThread.checkedShutdown();
    }
}
