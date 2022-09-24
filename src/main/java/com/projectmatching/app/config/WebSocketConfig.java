package com.projectmatching.app.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig  implements WebSocketMessageBrokerConfigurer {


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-message").setAllowedOrigins("12aaaaaaa123@@").withSockJS();
    }


    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){

        registry.setApplicationDestinationPrefixes("/MSG");
        registry.enableSimpleBroker("/topic","/queue");

    }
}
