/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication1;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.FilteredTextRenderListener;
import com.itextpdf.text.pdf.parser.LocationTextExtractionStrategy;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;
import com.itextpdf.text.pdf.parser.RegionTextRenderFilter;
import com.itextpdf.text.pdf.parser.RenderFilter;
import com.itextpdf.text.pdf.parser.TextExtractionStrategy;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.List;
import javax.imageio.ImageIO;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import javax.imageio.ImageIO;

public class JavaApplication1 {

    /** The original PDF that will be parsed. */
  //  public static final String PREFACE = "2.pdf";
    /** The resulting text file. */
    //public static final String RESULT = "preface_clipped.txt";
    public static final int fontchecksize=6;
    /**
     * Parses a specific area of a PDF to a plain text file.
     * @param pdf the original PDF
     * @param txt the resulting text
     * @throws IOException
     */
    public String mycheckline(PdfReader reader, int pheight, int pwidth, int lh, int page)throws IOException {
       // PrintWriter out = new PrintWriter(new FileOutputStream(txt));
        Rectangle rect = new Rectangle(0,pheight-lh,pwidth/3,pheight-lh-fontchecksize);
        RenderFilter filter = new RegionTextRenderFilter(rect);  
          TextExtractionStrategy strategy = new FilteredTextRenderListener(new LocationTextExtractionStrategy(), filter);
           return  (PdfTextExtractor.getTextFromPage(reader, page, strategy));
    }      
    public void parsePdf(String pdf, String txt ) throws IOException {
        PdfReader reader = new PdfReader(pdf+".pdf");
      //  PrintWriter out = new PrintWriter(new FileOutputStream(txt));
       // Rectangle rect = new Rectangle(0,0, 300,800);
      //  RenderFilter filter = new RegionTextRenderFilter(rect);
       // TextExtractionStrategy strategy;
    /*    for (int i = 1; i <= reader.getNumberOfPages(); i++) {
            strategy = new FilteredTextRenderListener(new LocationTextExtractionStrategy(), filter);
            out.println(PdfTextExtractor.getTextFromPage(reader, i, strategy));
        }*/
        
        int pw,ph;
        Rectangle mrect;
 
        //reader = new PdfReader(pdf);
        String g = new String();
        ArrayList<Integer> cutlist; 
        int lastblank;
        int lastword;
        //int p=reader.getNumberOfPages();
        int p=1;
        double f;
        BufferedImage img;
        BufferedImage img1;
        for(int k=1;k<=p;k++)
        {
            cutlist = new ArrayList<Integer>();
            lastword=0;
            lastblank=-1;
            mrect= reader.getPageSize(k);
            ph=(int)mrect.getHeight();
            pw=(int)mrect.getWidth();
            for(int i= 0;i<=(ph-fontchecksize);i+=fontchecksize)
            {
                 g=mycheckline(reader,ph,pw,i,k);
                 if(g.isEmpty())lastblank=i;
                  else
                 {
                   //  System.out.println(g);
                      if(lastword==0)
                      {
                          if(i>2*fontchecksize)cutlist.add(i-2*fontchecksize);
                                  else cutlist.add(0);
                          lastword=i;
                      }
                      else if(g.matches("\\d+\\..*"))
                     {
                         cutlist.add(((lastword+i)/2));
                        
                     }
                    lastword=i;
                     
                 }
            }
            if(lastword+3*fontchecksize<ph)
            {
                cutlist.add(lastword+3*fontchecksize);
            }
            else cutlist.add(ph-1);
          //  System.out.println("The arraylist contains the following elements: "+ cutlist);
             img = ImageIO.read(new File(txt+".png"));
             
             //img1 = ImageIO.read(new File("prefix-1.png"));
              f=img.getHeight()/ph;
              //System.out.println(f);
              int s;
            //  ImageIO.write(img.getSubimage(0,(int)(f*(84)),(int)(f*pw),(int)(f*(156-84))), "png", new File("7.png"));
             for(s=0;s<(cutlist.size()-1);s++)
             {
                // System.out.println(cutlist.get(s));
             ImageIO.write(img.getSubimage(0,(int)(f*(cutlist.get(s))),(int)(f*pw),(int)(f*(cutlist.get(s+1)-cutlist.get(s)))), "png", new File(txt+s+".png"));
             }
             
            
         /*  ImageIO.write(img.getSubimage(0,(int)(f*(84)),(int)(f*pw),(int)(f*(156-84))), "png", new File("7.png"));
             ImageIO.write(img.getSubimage(0,(int)(f*(156)),(int)(f*pw),(int)(f*(222-156))), "png", new File("8.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(186)),(int)(f*pw),(int)(f*(225-186))), "png", new File("1.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(225)),(int)(f*pw),(int)(f*(297-225))), "png", new File("2.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(297)),(int)(f*pw),(int)(f*(339-297))), "png", new File("3.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(339)),(int)(f*pw),(int)(f*(465-339))), "png", new File("4.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(465)),(int)(f*pw),(int)(f*(585-465))), "png", new File("5.png"));
             ImageIO.write(img1.getSubimage(0,(int)(f*(585)),(int)(f*pw),(int)(f*(630-585))), "png", new File("6.png"));*/
        }
    }


    /**
     * Main method.
     * @param    args    no arguments needed
     * @throws DocumentException 
     * @throws IOException
     */
    public static void main(String[] args) throws IOException, DocumentException 
{
    new JavaApplication1().parsePdf("2","prefix-1" );
  //  new JavaApplication1().parsePdf(args[0], args[1]);
}
    
}


