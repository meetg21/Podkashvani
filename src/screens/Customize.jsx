import { Back, VoiceSquare, Location } from 'iconsax-react-native';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Chip } from 'react-native-paper';

const images = [
    { source: require('../assets/images/Joey.png'), name: 'Joey', accent: "US", language: "English", speed: "fast" },
    { source: require('../assets/images/Joey.png'), name: 'Image 2', accent: "UK", language: "English", speed: "medium" },
    // Add more images as needed
];
const LENGTH = images.length;

export default function Customize() {
    const [index, setIndex] = React.useState(0); // Initialize with null

    const carouselRef = React.useRef(null);

    const renderItem = ({ item, index: itemIndex }) => (
        <TouchableOpacity
            style={[
                styles.carouselItem,
                { borderColor: index === itemIndex ? 'green' : 'black' },
            ]}
            onPress={() => setIndex(itemIndex)}
        >
            <Image source={item.source} style={styles.image} />
            <Text style={styles.imageName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#FFFDF4', '#00AAFF']} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Back button pressed')}>
                    <Back size="32" color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Customize your Guest character</Text>
            </View>
            
            <View style={{marginTop:'6%'}}></View>
            <Carousel
                ref={carouselRef}
                data={images}
                renderItem={renderItem}
                sliderWidth={400}
                itemWidth={300}
                onSnapToItem={(index) => setIndex(index)}
            />

            <View style={{position: "relative", top: -250, width: "100%", display: "flex", alignItems:"center"}}>
            <Text style={{fontSize: 20, color: '#212121', backgroundColor:"#fff", padding: 20, width: "100%", margin: 20}}>Audio Preview</Text>

            <View style={styles.chipContainer}>
                <Text style={{color: "black", fontSize: 20, fontWeight: 500, marginBottom: 20}}>Properties</Text>
                <View style={styles.chipInnerContainer}>
                    <Chip
                        style = {{margin: 5}}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].accent}
                    </Chip>
                    <Chip
                        style = {{margin: 5}}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].language}
                    </Chip>
                    <Chip
                        style = {{margin: 5}}
                        onPress={() => console.log('Pressed')}
                    >
                        {images[index].speed}
                    </Chip>
                </View>
            </View>

            {index !== null && (
                <Pagination
                    dotsLength={LENGTH}
                    activeDotIndex={index}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            )}
            </View>
        </LinearGradient>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    headerText: {
        color: '#212121',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    carouselItem: {
        width: 300, // Adjust as needed
        height: 300, // Adjust as needed
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212121',
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
    },
    imageName: {
        fontSize: 16,
        marginTop: 5,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        marginHorizontal: 8,
    },
    

    chipContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    chipInnerContainer: {
        display: "flex",
        flexDirection: "row",
    }
});
