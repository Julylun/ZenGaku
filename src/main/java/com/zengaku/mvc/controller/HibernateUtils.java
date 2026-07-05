package com.zengaku.mvc.controller;

import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.service.ServiceRegistry;

public class HibernateUtils {

    private static final SessionFactory sessionFactory = buildSessionFactory();

    private HibernateUtils() {
        super();
    }

    private static SessionFactory buildSessionFactory() {
        try{
            StandardServiceRegistryBuilder registryBuilder = new StandardServiceRegistryBuilder()
                    .configure(); // Load hibernate.cfg.xml from resource folder by default
            applyEnvironmentSetting(registryBuilder, "HIBERNATE_CONNECTION_URL", "hibernate.connection.url");
            applyEnvironmentSetting(registryBuilder, "HIBERNATE_CONNECTION_USERNAME", "hibernate.connection.username");
            applyEnvironmentSetting(registryBuilder, "HIBERNATE_CONNECTION_PASSWORD", "hibernate.connection.password");
            ServiceRegistry serviceRegistry = registryBuilder.build();
            Metadata metadata = new MetadataSources(serviceRegistry).getMetadataBuilder().build();
            return metadata.getSessionFactoryBuilder().build();
        } catch (Exception e){
            System.err.println("Initial SessionFactory creation failed. - " + e);
            throw new ExceptionInInitializerError(e);
        }

    }

    private static void applyEnvironmentSetting(StandardServiceRegistryBuilder registryBuilder, String envName, String hibernateName) {
        String value = System.getenv(envName);
        if (value != null && !value.isBlank()) {
            registryBuilder.applySetting(hibernateName, value);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void close() {
        getSessionFactory().close();
    }
}
