package example.book.model;



import javax.persistence.*;
import java.time.LocalDate;


@Entity
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(columnDefinition = "VARCHAR(255)")
    private String image;

    @Column(columnDefinition = "DATE")
    private LocalDate submittedDate;

    @Column(columnDefinition = "VARCHAR(50)")
    private String timeExistence;
    private String link;

    @ManyToOne
    @JoinColumn(name = "placement_id", referencedColumnName = "id")
    private Placement placement;

    @Column(columnDefinition = "BIT(1) default 0")
    private Integer status = 0;

    public Advertisement() {
    }

    public Advertisement(Integer id, String title, String image, LocalDate submittedDate, String timeExistence, String link, Placement placement, Integer status) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.submittedDate = submittedDate;
        this.timeExistence = timeExistence;
        this.link = link;
        this.placement = placement;
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getSubmittedDate() {
        return submittedDate;
    }

    public void setSubmittedDate(LocalDate submittedDate) {
        this.submittedDate = submittedDate;
    }

    public String getTimeExistence() {
        return timeExistence;
    }

    public void setTimeExistence(String timeExistence) {
        this.timeExistence = timeExistence;
    }

    public Placement getPlacement() {
        return placement;
    }

    public void setPlacement(Placement placement) {
        this.placement = placement;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
