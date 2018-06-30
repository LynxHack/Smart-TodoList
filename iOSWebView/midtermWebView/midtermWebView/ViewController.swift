//
//  ViewController.swift
//  midtermWebView
//
//  Created by Jordan Anders on 2018-06-29.
//  Copyright © 2018 Jordan Anders. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController {

    @IBOutlet weak var webView: WKWebView!
    override func viewDidLoad() {
        super.viewDidLoad()
        let url = URL(string: "https://midterm-todobot.herokuapp.com/")
        let urlRequest = URLRequest(url: url!)
        
        webView.load(urlRequest)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

