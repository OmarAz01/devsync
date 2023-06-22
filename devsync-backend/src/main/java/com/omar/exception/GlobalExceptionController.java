package com.omar.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(Exception.class)
    public ModelAndView handleAllException(Exception e) {

        ModelAndView model = new ModelAndView("error/generic_error");
        model.addObject("errMsg", "An error occurred: " + e.getMessage());

        return model;

    }

}